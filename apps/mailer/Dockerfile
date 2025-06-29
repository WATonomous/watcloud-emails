FROM ghcr.io/fission/node-env-22:1.34.2@sha256:ee7afcc577fef2cf97349baf453e9b57759364b8c5a2bf93dddda01d5df6dfc1 AS app

RUN apk add curl

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["sh", "/entrypoint.sh"]

ENV USERFUNCVOL=/deploypkg
COPY ./dist $USERFUNCVOL


FROM app AS enqueue

RUN printf '{"filepath": "%s", "functionName": "enqueue"}' $USERFUNCVOL > /state.json


FROM app AS send

RUN printf '{"filepath": "%s", "functionName": "send"}' $USERFUNCVOL > /state.json
