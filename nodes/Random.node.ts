import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:random.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Gerador de Número Aleatório Verdadeiro via Random.org',
		defaults: {
			name: 'Random',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'True Random Number Generator',
						value: 'trueRandomNumberGenerator',
						description: 'Gera um número inteiro aleatório usando a API do Random.org',
						action: 'Gera um numero inteiro aleatorio usando a api do random org',
					},
				],
				default: 'trueRandomNumberGenerator',
			},
			{
				displayName: 'Mínimo',
				name: 'min',
				type: 'number',
				typeOptions: {
					numberStepSize: 1,
				},
				default: 1,
				description: 'O valor mínimo para o número aleatório (inclusivo)',
			},
			{
				displayName: 'Máximo',
				name: 'max',
				type: 'number',
				typeOptions: {
					numberStepSize: 1,
				},
				default: 60,
				description: 'O valor máximo para o número aleatório (inclusivo)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const min = this.getNodeParameter('min', i) as number;
			const max = this.getNodeParameter('max', i) as number;

			if (min > max) {
				throw new NodeOperationError(
					this.getNode(),
					'O valor de "Mínimo" deve ser menor ou igual ao valor de "Máximo".',
					{ itemIndex: i },
				);
			}

			const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

			try {
				const responseData = await this.helpers.httpRequest({
					method: 'GET',
					url,
					json: false,
				});

				const randomNumber = parseInt(responseData as string, 10);

				returnData.push({
					json: {
						randomNumber,
						min,
						max,
					},
				});
			} catch (error) {
				throw new NodeOperationError(
					this.getNode(),
					'Falha ao gerar o número aleatório. Verifique sua conexão ou a disponibilidade da API.',
					{ itemIndex: i },
				);
			}
		}

		return [returnData];
	}
}
