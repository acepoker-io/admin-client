import React, { Fragment, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
// import { Spinner } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
//import user from '../../assets/images/user.png';
import { useHistory } from 'react-router-dom';
// import DataTableExtensions from 'react-data-table-component-extensions';
//import Confirmation from '../confirmationModal/confirmationPopup';
import Confirmation from '../../model/confirmationPopup'; 
//import BlockConfirmation from '../confirmationModal/blockConfimationPopup';
// import { userServer } from '../../config/keys';
//import SearchHeader from '../common/header_components/searchHeader';
const TournamentDateTable = ({
	id,
	myData,
	myClass,
	multiSelectOption,
	// pagination,
	setActiveId,
	setOpen,
}) => {
	const history = useHistory();
	// const { AllUserData, adminProfileData } = adminData ?? {};
	// const { role } = adminProfileData || [];

	const [deletePopup, setDeletePopup] = useState(false);
	const [blockUnblockPopup, setBlockUnblockPopup] = useState(false);
	//const [blockUnblockPopup, setBlockUnblock] = useState(myData.isBlock);
	const [userId, setUserId] = useState();
	const [blockUnblockInfo, setBlockUnblockInfo] = useState();
	//const [qsearch, setSearch] = useState('');

	const [data, setData] = useState();
	useEffect(() => {
		setData(myData);
	}, [myData]);

	const columnDefs = [
		// {
		// 	name: 'Avatar',
		// 	cell: (row) => <ProfileImage row={row} />,
		// },
		{
			name: 'Full Name',
			id: 'director',

			selector: (row) => row?.name,
			sortable: true,
			filter: true,
		},
		{
			name: 'Username',
			selector: (row) => row?.username,
			sortable: true,
		},
		{
			name: 'Email',
			selector: (row) => row?.email,
			sortable: true,
		},
		{
			name: 'Block/Unblock',
			cell: (row) => <BlockSection row={row} />,
			sortable: true,
		},
		 {
					name: 'Action',
					cell: (row) => (
						<ActionButton
							row={row}
							handleDelete={handleDelete}
							handleEdit={handleEdit}
							handleBlock={handleBlock}
							//blockUnblockUser={blockUnblockUser}
						/>
					),
			  }
			
	];

	const handleEdit = (id) => {
		history.push(`/users/updateUser?id=${id}`);
	};
	const handleDelete = (userid) => {
		setDeletePopup(true);
		setUserId(userid);
		// handleDeleteUser(userid);
	};
	const handleBlock = (row) => {
		setBlockUnblockPopup(true);
		setUserId(row?._id);
		setBlockUnblockInfo({ blockInfo: row?.isBlock, username: row?.username });
		setBlockUnblockInfo(!blockUnblockInfo);
	};
	const handleDeleteUser = async () => {
		try {
			if (userId) {
				// await dispatch(deleteUserData({ userid: userId }));
				// await dispatch(getAllUserData());
				setDeletePopup(false);
				// setmshow(false);
			}
		} catch (err) {
			console.log('Error in delete', err);
		}
	};
	// const blockUnblockUser = async () => {
	// 	try {
	// 		//setblockUnblock(!blockUnblock);
	// 		// const blockPayload = {
	// 		// 	userId: userId,
	// 		// 	blockInfo: blockUnblock,
	// 		// };
	// 		// setLoading(() => true);
	// 		// await dispatch(blockAndUnblockUser(blockPayload));
	// 		// await dispatch(getAllUserData());
	// 		setBlockUnblockPopup(false);
	// 	} catch (err) {
	// 		console.log('Error in block the user function');
	// 	}
	// };
	const closeConfirmation = () => {
		setDeletePopup(!deletePopup);
		setBlockUnblockPopup(!blockUnblockPopup);
	};
	// const closeBlockConfirmation = () => {
	// 	setBlockUnblockPopup(false);
	// };

	return (
		<div className="user-listing-section ReactTable">
			
				<Fragment>
					<>
						{/* <DataTableExtensions
							columns={columnDefs}
							data={data}
							print={false}
							export={false}
						> */}
							<DataTable
								data={data}
								columns={columnDefs}
								className={myClass}
								pagination
								striped={true}
								center={true}
							/>
						{/* </DataTableExtensions> */}
					</>
					<Confirmation
						open={deletePopup}
						onCloseModal={closeConfirmation}
						handleConfirm={handleDeleteUser}
					/>

					{/* <BlockConfirmation
						open={blockUnblockPopup}
						onCloseModal={closeBlockConfirmation}
						handleConfirm={blockUnblockUser}
						blockUnblockInfo={blockUnblockInfo}
					/> */}
				</Fragment>
			
		</div>
	);
};

// const ProfileImage = ({ row }) => {
// 	return (
// 		<div className="profile-image">
// 			<img
// 				src={row.profilePic ? `${userServer}/${row.profilePic}` : user}
// 				alt="logo"
// 				onError={(e) => {
// 					e.target.onerror = null;
// 					e.target.src = user;
// 				}}
// 				style={{ height: '20px', width: '20px' }}
// 			/>
// 		</div>
// 	);
// };

const ActionButton = ({ row, handleDelete, handleEdit, handleBlock }) => {
	return (
		<div className="action-btn">
			<span>
				<i
					onClick={() => handleDelete(row._id)}
					className="fa fa-trash"
					style={{
						width: 35,
						fontSize: 20,
						padding: 11,
						color: '#e4566e',
					}}
				></i>
			</span>
			<span>
				<i
					onClick={() => handleEdit(row._id)}
					className="fa fa-pencil"
					style={{
						width: 35,
						fontSize: 20,
						padding: 11,
						color: 'rgb(40, 167, 69)',
					}}
				></i>
			</span>
			<span>
				<i
					onClick={() => handleBlock(row)}
					//className="fa fa-user"
					className={
						row.isBlock ? 'fa fa-lock text-danger' : 'fa fa-unlock text-success'
					}
					style={{
						width: 35,
						fontSize: 20,
						padding: 11,
						color: 'rgb(40, 167, 69)',
					}}
				></i>
			</span>
		</div>
	);
};

const BlockSection = ({ row }) => {
	return (
		<div className="block-unblock-section">
			{row.isBlock ? (
				<span className="text-danger">Block</span>
			) : (
				<span className="text-success">Unblock</span>
			)}
		</div>
	);
};
export default TournamentDateTable;
