import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/png" href="/img/logo/maestro-svgrepo.svg" />

				{/* SEO */}
				<meta name="keyword" content={'wheelz, wheels-deals.uz, wheelz-dels,devex mern, mern nestjs fullstack'} />
				<meta
					name={'description'}
					content={
						'Buy and sell Vehicles anywhere anytime in South Korea. Best Vehicles at Best prices on wheelz-deals.uz | ' +
						'Покупайте и продавайте недвижимость в любой точке Южной Кореи в любое время. Лучшая недвижимость по лучшим ценам на wheelz-deals.uz | ' +
						'대한민국 언제 어디서나 부동산을 사고팔 수 있습니다. wheelz-deals.uz에서 최적의 가격으로 최고의 부동산을 만나보세요'
					}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
