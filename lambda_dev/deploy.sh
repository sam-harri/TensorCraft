#!/bin/bash

# Variables
FUNCTION_NAME="PytorchCompiler"
ROLE_NAME="LambdaExecutionRole"
ROLE_ARN="arn:aws:iam::605779301919:role/$ROLE_NAME"
HANDLER_NAME="pytorchcompiler.lambda_handler"
ZIP_FILE="pytorch_lambda.zip"
PYTHON_VERSION="python3.10"

# Step 1: Create a deployment package
mkdir -p pytorch_lambda
cp pytorchcompiler.py pytorch_lambda/
pip install networkx -t pytorch_lambda/ 
cd pytorch_lambda
zip -r ../$ZIP_FILE .
cd ..

# Step 2: Check if the Lambda function already exists
aws lambda get-function --function-name $FUNCTION_NAME > /dev/null 2>&1
if [ $? -eq 0 ]; then
    # Update the existing Lambda function code
    echo "Updating existing Lambda function..."
    aws lambda update-function-code --function-name $FUNCTION_NAME --zip-file fileb://$ZIP_FILE
else
    # Create a new Lambda function
    echo "Creating new Lambda function..."
    aws lambda create-function \
        --function-name $FUNCTION_NAME \
        --runtime $PYTHON_VERSION \
        --role $ROLE_ARN \
        --handler $HANDLER_NAME \
        --zip-file fileb://$ZIP_FILE
fi

# Publish a new version
VERSION=$(aws lambda publish-version --function-name $FUNCTION_NAME --query 'Version' --output text)
echo "Published version: $VERSION"

# Update alias 'prod' to point to the new version
aws lambda update-alias --function-name $FUNCTION_NAME --name prod --function-version $VERSION || \
aws lambda create-alias --function-name $FUNCTION_NAME --name prod --function-version $VERSION

# Clean up
rm -rf pytorch_lambda
rm $ZIP_FILE
