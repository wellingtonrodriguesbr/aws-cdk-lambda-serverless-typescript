import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  const method = event.httpMethod;
  const lambdaRequestId = context.awsRequestId;
  const apiRequestId = event.requestContext.requestId;

  console.log(`[API Gateway RequestId]: ${apiRequestId} - [Lambda RequestId]: ${lambdaRequestId}`);

  if (event.resource === "/products") {
    if (method === "GET") {
      console.log("[GET]: /products");

      return {
        statusCode: 200,
        body: JSON.stringify({
          data: [
            { id: 1, name: "Product 1" },
            { id: 2, name: "Product 2" },
          ],
        }),
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Invalid request",
    }),
  };
}
