locals {
  backend_stack_name = "${var.project_name}-${var.environment_name}"
}

# Scaffold-only entry point. Resource modules are intentionally left for the implementation phase.
module "backend_stack" {
  source = "./modules/backend-stack"

  project_name     = var.project_name
  environment_name = var.environment_name
  location         = var.location
}
