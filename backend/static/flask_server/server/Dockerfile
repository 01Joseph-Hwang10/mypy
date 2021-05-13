# Make sure to change the python version later
FROM python:3.6.12-alpine
RUN mkdir /app
RUN mkdir /log
# RUN mkdir /files
WORKDIR /app
EXPOSE 5000
ENV PATH="/app:${PATH}"
# COPY requirements.txt ./
# RUN pip install --no-cache-dir requirements.txt
RUN pip install flask flask-cors gunicorn pyjwt __MARKDOWN __PILLOW
COPY ./app/ /app/
CMD ["gunicorn", "-b", "0.0.0.0:5000", "__app:app"]
