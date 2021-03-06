import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Breadcrumb } from 'react-bootstrap';
import ViewMedical from './viewMedical';

class ViewSubmittedMedicals extends Component {
	state = { records: [], date: '' };

	async componentDidMount() {
		const { id } = this.props.user;
		try {
			const { data: records } = await axios.get(`/api/submitMedical/${id}`);
			this.setState({ records });
		} catch (err) {
			console.log(err);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) {
			if (!this.props.user.id) this.redirectToHome();
		}
	}

	renderBreadCrumbs = () => {
		return (
			<Breadcrumb>
				<Breadcrumb.Item href='/home'>Home</Breadcrumb.Item>
				<Breadcrumb.Item href='/absent'>Submit Medical Report</Breadcrumb.Item>
				<Breadcrumb.Item active>View Submitted Medicals</Breadcrumb.Item>
			</Breadcrumb>
		);
	};

	handleDateSelect = date => this.setState({ date });

	renderList() {
		const { records } = this.state;
		return (
			<div className='btn-group-vertical btn-group-sm w-100 text-center'>
				{records.map(r => (
					<button
						key={r._id}
						className='btn btn-outline-primary btn-sm'
						style={{ minHeight: 60 }}
						onClick={() => this.handleDateSelect(r.timestamp)}>
						{moment(r.timestamp).format('YYYY:MM:DD HH:mm:ss a')}
					</button>
				))}
			</div>
		);
	}

	renderNoRecords = () => {
		return <div className='jumbotron text-center'>No Records available...</div>;
	};

	renderRecords = () => {
		const { date, records } = this.state;
		return (
			<React.Fragment>
				<div className='row'>
					<div className='col-3'>{this.renderList()}</div>
					<div className='col'>
						<ViewMedical date={date} records={records} />
					</div>
				</div>
			</React.Fragment>
		);
	};

	redirectToHome = () => this.props.history.push('/home');

	render() {
		const { records } = this.state;

		return (
			<React.Fragment>
				{this.renderBreadCrumbs()}
				{records.length === 0 ? this.renderNoRecords() : this.renderRecords()}
			</React.Fragment>
		);
	}
}

export default ViewSubmittedMedicals;
