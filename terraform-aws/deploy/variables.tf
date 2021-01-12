variable "prefix" {
  default = "ddo"
}

variable "project" {
  default = "django-api-devops"
}

variable "contact" {
  default = "hgmeza114@gmail.com"
}

variable "db_username" {
  description = "Username for the RDS postgres instance"
}

variable "db_password" {
  description = "Password for the RDS instance"
}

variable "bastion_key_name" {
  default = "django-api-devops-bastion"
}

variable "ecr_image_api" {
  description = "ECR image for API"
  default     = "270796812728.dkr.ecr.us-east-2.amazonaws.com/django-recipe-api-devops:latest"
}

variable "ecr_image_proxy" {
  description = "ECR image for Proxy"
  default     = "270796812728.dkr.ecr.us-east-2.amazonaws.com/django-api-proxy:latest"
}

variable "django_secret_key" {
  description = "Secret key for Django API"
}
