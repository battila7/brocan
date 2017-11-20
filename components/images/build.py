import argparse
import json
import os
import redis
import subprocess

def main():
    parser = argparse.ArgumentParser(description = 'Brocan CI docker base image builder utility.')

    parser.add_argument('registry_uri', metavar = 'registry-uri', help = 'The URI of the destination registry.')
    parser.add_argument('redis_host', metavar = 'redis-host', help = 'The host of the Redis instance where tag mappings can be saved.')
    parser.add_argument('redis_port', metavar = 'redis-port', help = 'The port of the Redis instance where tag mappings can be saved.')

    args = parser.parse_args()

    with open('images.json') as images_file:
        contents = json.load(images_file)

        db = redis.StrictRedis(host = args.redis_host, port = args.redis_port)

        for image in contents['images']:
            process_image(image, args.registry_uri, db)


def process_image(image, registry_uri, db):
    local_tag = create_local_tag(image['mappedTo'])
    remote_tag = create_remote_tag(registry_uri, image['mappedTo'])

    build_image(local_tag, image['mappedTo'])

    remote_tag_image(local_tag, remote_tag)

    push_image(remote_tag)

    add_mapping_to_db(db, image['mappedFrom'], remote_tag)


def add_mapping_to_db(db, mapped_from, remote_tag):
    db.set(mapped_from, remote_tag)


def push_image(remote_tag):
    subprocess.run(['docker', 'push', remote_tag])


def remote_tag_image(local_tag, remote_tag):
    subprocess.run(['docker', 'tag', local_tag, remote_tag])


def build_image(local_tag, image_name):
    subprocess.run(['docker', 'build', '-t', local_tag, docker_context(image_name)])


def docker_context(image_name):
    return os.path.join(os.getcwd(), image_name)


def create_local_tag(image_name):
    return '{image}:{tag}'.format(image = image_name, tag = 'latest')


def create_remote_tag(registry_uri, image_name):
    return '{uri}/{image}'.format(uri = registry_uri, image = image_name)


if __name__ == '__main__':
    main()
