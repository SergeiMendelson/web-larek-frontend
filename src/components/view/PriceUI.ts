export class PriceUI {
	static renderPrice(price: number | null): string {
		if (price === null) return 'Бесценно';
		return `${price}` + (price === 1 ? ' синапс' : ' синапсов'); // TODO: Сделать нормальные окончания
	}
}
