variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "key_name" {
  description = "Name of the SSH key pair"
  default     = "ta-cle-ssh" # Remplace par le nom de ta clé SSH dans AWS
}