variable "project_name" {
  type        = string
  description = "Logical project name used by backend resources."
}

variable "environment_name" {
  type        = string
  description = "Deployment environment name."
}

variable "location" {
  type        = string
  description = "Azure region for the backend stack."
}
