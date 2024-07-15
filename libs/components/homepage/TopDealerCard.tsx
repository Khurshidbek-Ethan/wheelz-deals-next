import React from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Member } from '../../types/member/member';

interface TopdealerProps {
	dealer: Member;
}
const TopdealerCard = (props: TopdealerProps) => {
	const { dealer } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const dealerImage = dealer?.memberImage
		? `${process.env.REACT_API_URL}/${dealer?.memberImage}`
		: '/img/profile/defaultUser.svg';

	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className="top-dealer-card">
				<img src={dealerImage} alt="" />

				<strong>{dealer?.memberNick}</strong>
				<span>{dealer?.memberType}</span>
			</Stack>
		);
	} else {
		return (
			<Stack className="top-dealer-card">
				<img src={dealerImage} alt="" />

				<strong>{dealer?.memberNick}</strong>
				<span>{dealer?.memberType}</span>
			</Stack>
		);
	}
};

export default TopdealerCard;
