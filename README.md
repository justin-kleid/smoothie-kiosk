# smoothie-kiosk

A demo vending kiosk for smoothies meant to be run locally on a computer. The project uses Python (Flask) for the backend in coordination with MongoDB. The front end used next.js.

The landing page for the front end is: http://localhost:3000/. In the front end directory, I also created a UI for the admin/owner to track inventory changes, etc.

## Notes:

This is intended as a demo and has some obviously questionable security practices. There is no password for the admin features (and it is attached to the customer facing front-end). Also, the smoothies are tracked using a database I created which I have made the authentication for public (in smoothie-backend/config.ini)

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
cd smoothie-kiosk
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

Need Node + yarn or npm

```bash
cd smoothie_frontend
yarn
yarn dev
```

The landing page is at http://localhost:3000/
Run both the frontend and backend together.
