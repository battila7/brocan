FROM golang

RUN go get -v github.com/nats-io/prometheus-nats-exporter

EXPOSE 7777

ENTRYPOINT "prometheus-nats-exporter"
