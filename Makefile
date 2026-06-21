APP_NAME ?= portfolio
REGISTRY ?= ghcr.io/a-haseeb-dev
TAG ?= latest

.PHONY: help build push dev up down k8s-apply k8s-delete clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Build Docker image
	docker build -t $(REGISTRY)/$(APP_NAME):$(TAG) .

build-no-cache: ## Build Docker image without cache
	docker build --no-cache -t $(REGISTRY)/$(APP_NAME):$(TAG) .

push: ## Push Docker image to registry
	docker push $(REGISTRY)/$(APP_NAME):$(TAG)

dev: ## Run development server locally
	npm run dev

up: ## Start services with docker-compose
	docker compose up -d --build

down: ## Stop docker-compose services
	docker compose down

logs: ## View docker-compose logs
	docker compose logs -f

k8s-apply: ## Apply all Kubernetes manifests
	kubectl apply -k k8s/

k8s-delete: ## Delete all Kubernetes resources
	kubectl delete -k k8s/

k8s-status: ## Show Kubernetes resource status
	kubectl get all -n portfolio

k8s-logs: ## Tail pod logs
	@read -p "Pod name: " pod; \
	kubectl logs -n portfolio -f $$pod

k8s-scale: ## Scale deployment
	@read -p "Replicas: " replicas; \
	kubectl scale deployment/portfolio -n portfolio --replicas=$$replicas

k8s-restart: ## Rollout restart deployment
	kubectl rollout restart deployment/portfolio -n portfolio

k8s-rollback: ## Rollback to previous revision
	kubectl rollout undo deployment/portfolio -n portfolio

clean: ## Clean Docker artifacts
	docker system prune -f --volumes
