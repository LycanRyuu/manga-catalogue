FROM golang:1.18-alpine AS builder
WORKDIR /build
COPY . .
ENV CGO_ENABLED=0
RUN go mod tidy
RUN go build -o Backend .

FROM scratch
COPY --from=builder /build /
ENTRYPOINT [ "/Backend" ]