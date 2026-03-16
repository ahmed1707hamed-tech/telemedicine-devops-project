provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "telemedicine_server" {
  ami           = "ami-0c02fb55956c7d316"
  instance_type = "t3.micro"

  key_name = "telemedicine"

  tags = {
    Name = "telemedicine-devops-server"
  }
}