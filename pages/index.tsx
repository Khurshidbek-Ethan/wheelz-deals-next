import { NextPage } from 'next';
import useDeviceDetect from '../libs/hooks/useDeviceDetect';
import withLayoutMain from '../libs/components/layout/LayoutHome';
import CommunityBoards from '../libs/components/homepage/CommunityBoards';
import Events from '../libs/components/homepage/Events';
import { Divider, Stack } from '@mui/material';
import Advertisement from '../libs/components/homepage/Advertisement';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TrendVehicles from '../libs/components/homepage/TrendVehicles';
import PopularVehicles from '../libs/components/homepage/PopularVehicles';
import TopVehicles from '../libs/components/homepage/TopVehicles';
import Topdealers from '../libs/components/homepage/TopDealers';
import HeaderFilter from '../libs/components/homepage/HeaderFilter';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Home: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return (
			<Stack className={'home-page'}>
				<TrendVehicles />
				<PopularVehicles />
				<Advertisement />
				<TopVehicles />
				<Topdealers />
			</Stack>
		);
	} else {
		return (
			<Stack className={'home-page'}>
				<HeaderFilter />
				<Divider sx={{ mt: '15px', mb: '17px', color: '#161515' }} />
				<TrendVehicles />
				<PopularVehicles />
				<Advertisement />
				<TopVehicles />
				<Topdealers />
				<Events />
				<CommunityBoards />
			</Stack>
		);
	}
};

export default withLayoutMain(Home);
