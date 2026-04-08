.PHONY: start-dbs stop-dbs dev setup

start-dbs:
	docker-compose up -d

stop-dbs:
	docker-compose down

setup:
	@echo "Install Node/npm and Python 3 locally"
	cd frontend && npm install
	cd backend && npm install
	cd ai-service && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt

dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && npm run dev

dev-ai:
	cd ai-service && source venv/bin/activate && uvicorn main:app --reload

dev-all: start-dbs
	@echo "Run dev-frontend, dev-backend, and dev-ai in separate terminals."
