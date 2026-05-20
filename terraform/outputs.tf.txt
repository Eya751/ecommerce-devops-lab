output "instance_public_ips" {
  description = "Public IPs of the EC2 instances"
  value       = aws_instance.web[*].public_ip
}

output "alb_dns_name" {
  description = "DNS name of the ALB"
  value       = aws_lb.ecommerce_alb.dns_name
}