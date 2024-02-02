# smoothie-kiosk

A demo vending kiosk for smoothies meant to be run locally on a computer.

## Directory Overview

```bash
├── smoothie_backend
  ├── app.py
  ├── ...
├── smoothie_frontend
  ├── src
    ├── ...
  ├── ...
```

## Installation

Clone the repo

```bash
git clone https://github.com/justin-kleid/smoothie-kiosk.git
```

### Build Backend

Set up virtual environment

```bash
cd smoothie_backend
python3 -m venv smoothie
source smoothie/bin/activate (For Windows: .\smoothie\Scripts\activate)
pip install -r requirements.txt
```

Run the backend

```bash
python3 app.py
```

Landing page at: http://127.0.0.1:5000

### Build Frontend

```bash
cd smoothie_frontend
yarn
yarn dev
```

The landing page is at http://localhost:3000/
