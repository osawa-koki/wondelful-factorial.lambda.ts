import {
  type APIGatewayEvent,
  type APIGatewayProxyHandler,
  type APIGatewayProxyResult
} from 'aws-lambda'
import { LambdaClient, InvokeCommand, InvokeCommandInput } from '@aws-sdk/client-lambda'
import dotenv from 'dotenv'

dotenv.config()

const { LAMBDA_FACTORIAL_FUNCTION_NAME: factorialFunctionName } = process.env

if (factorialFunctionName == null) throw new Error('LAMBDA_FACTORIAL_FUNCTION_NAME is not defined')

export const lambdaHandler: APIGatewayProxyHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  // クエリパラメタからnを取得
  const nStr = event.queryStringParameters?.n
  if (nStr == null) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'n is required'
      })
    }
  }
  const n = parseInt(nStr, 10)
  if (n < 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'n must be a non-negative integer'
      })
    }
  }
  if (n > 30) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'n must be less than or equal to 30'
      })
    }
  }
  if (n === 0) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        n: 1
      })
    }
  }
  const lambdaClient = new LambdaClient({})
  const params: InvokeCommandInput = {
    FunctionName: factorialFunctionName,
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify({
      queryStringParameters: {
        n: n - 1
      }
    })
  }
  const command = new InvokeCommand(params)
  const response = Buffer.from((await lambdaClient.send(command)).Payload!)
  const result = JSON.parse(response.toString())
  const body = JSON.parse(result.body)
  return {
    statusCode: 200,
    body: JSON.stringify({
      n: n * body.n
    })
  }
}
