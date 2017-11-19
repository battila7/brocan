import json

def main():
    IMAGES_FILE = 'images.json'

    with open(IMAGES_FILE) as images_file:
        contents = json.load(images_file)

        for image in contents['images']:
            build_image(contents['registryUri'], image)

def build_image(registryUri, image):
    print(image)

if __name__ == '__main__':
    main()
