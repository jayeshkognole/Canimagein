FROM python:3.11.4-bookworm as base

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpoppler-cpp-dev \
    libcairo2-dev \
    libgdk-pixbuf2.0-dev \
    libffi-dev \
    build-essential \
    sqlite3 libsqlite3-dev

# RUN apt-get install -y libcurl4-openssl-dev
# RUN apt-get --only-upgrade -y install libcurl4-openssl-dev
# Clean up apt cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /api-server

COPY requirements.txt requirements.txt

# Crucial: Compile pysqlite3 against the newly installed sqlite3
# RUN pip3 install --no-cache-dir "pysqlite3-binary==3.40.1" # Or a newer compatible version
RUN pip3 install --no-cache-dir -r requirements.txt

# RUN git clone https://github.com/Google-Health/imaging-research.git
# RUN pip3 install lib/imaging-research/cxr-foundation/

EXPOSE 5001

COPY . .

CMD ["python", "app.py"]