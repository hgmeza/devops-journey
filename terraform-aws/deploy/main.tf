terraform {
  backend "s3" {
    bucket         = "django-recipe-api-devops-tfstate"
    key            = "recipe-app.tfstate"
    region         = "us-east-2"
    encrypt        = true
    dynamodb_table = "django-recipe-api-devops-tf-state-lock"
  }
}

provider "aws" {
  region  = "us-east-2"
  version = "~> 2.54.0"
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"
  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    Owner       = var.contact
    ManagedBy   = "Terraform"
  }
}

data "aws_region" "current" {}
