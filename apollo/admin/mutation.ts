import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const UPDATE_MEMBER_BY_ADMIN = gql`
	mutation UpdateMemberByAdmin($input: MemberUpdate!) {
		updateMemberByAdmin(input: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberDesc
			memberVehicle
			memberRank
			memberArticles
			memberPoints
			memberLikes
			memberViews
			memberWarnings
			memberBlocks
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

/**************************
 *        vehicle        *
 *************************/

export const UPDATE_vehicle_BY_ADMIN = gql`
	mutation UpdatevehicleByAdmin($input: vehicleUpdate!) {
		updatevehicleByAdmin(input: $input) {
			_id
			VehicleType
			vehicleStatus
			VehicleLocation
			vehicleAddress
			vehicleTitle
			vehiclePrice
			vehicleSquare
			vehicleBeds
			vehicleRooms
			vehicleViews
			vehicleLikes
			vehicleImages
			vehicleDesc
			vehicleBarter
			vehicleRent
			memberId
			soldAt
			deletedAt
			constructedAt
			createdAt
			updatedAt
		}
	}
`;

export const REMOVE_vehicle_BY_ADMIN = gql`
	mutation RemovevehicleByAdmin($input: String!) {
		removevehicleByAdmin(vehicleId: $input) {
			_id
			VehicleType
			vehicleStatus
			VehicleLocation
			vehicleAddress
			vehicleTitle
			vehiclePrice
			vehicleSquare
			vehicleBeds
			vehicleRooms
			vehicleViews
			vehicleLikes
			vehicleImages
			vehicleDesc
			vehicleBarter
			vehicleRent
			memberId
			soldAt
			deletedAt
			constructedAt
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const UPDATE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation UpdateBoardArticleByAdmin($input: BoardArticleUpdate!) {
		updateBoardArticleByAdmin(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const REMOVE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation RemoveBoardArticleByAdmin($input: String!) {
		removeBoardArticleByAdmin(articleId: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         COMMENT        *
 *************************/

export const REMOVE_COMMENT_BY_ADMIN = gql`
	mutation RemoveCommentByAdmin($input: String!) {
		removeCommentByAdmin(commentId: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;
