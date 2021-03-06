import React, { Component } from 'react';
import axios from 'axios';
import renderData from '../../common/progressBar';
import AttendancePDF from './attendancePDF';

class AttendanceTable extends Component {
	state = {
		present: [],
		total: [],
		filtered: [],
		students: [],
		lecture: '',
		date: '',
		course: {},
		pdfData: {}
	};

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) this.loadData();
	}

	loadData = async () => {
		const { code, date } = this.props;

		try {
			const { data: course } = await axios.get(`/api/courses/${code}`);

			const { data: total } = await axios.get(
				`/api/users?role=student&code=${code}`
			);

			const { data: present } = await axios.post(`/api/attendance/${code}`, {
				date
			});

			// lecture name for the current date
			const lecture = course.dates.filter(d => d.date === date)[0].lecture;

			const students = present.map(p => p.student._id);

			this.setState({
				present,
				total,
				students,
				lecture,
				date,
				course,
				pdfData: {},
				filtered: []
			});
		} catch (err) {
			console.error(err.message);
		}
	};

	generatePdf = async () => {
		const {
			total: records,
			course: { code, name, lecturer },
			date,
			lecture
		} = this.state;

		const items = records.map(r => [
			r.firstName,
			r.username,
			this.isPresent(r._id)
		]);

		const data = {
			headers: ['Index Number', 'Name', 'Status'],
			items,
			course: { code, name, lecturer },
			date,
			lecture
		};

		this.setState({ pdfData: data });
	};

	renderDownloadPdfButton = () => (
		<button className='btn btn-primary w-100 btn-sm' onClick={this.generatePdf}>
			<small>
				GENERATE PDF <i className='fa fa-download ml-1' aria-hidden='true' />
			</small>
		</button>
	);

	isPresent = student => {
		return this.state.students.includes(student);
	};

	renderLectureDetails = () => {
		return (
			<p className='lead text-dark mb-2' style={{ cursor: 'default' }}>
				<i className='fa fa-pencil-square-o mr-2' aria-hidden='true' />
				{this.state.lecture}
			</p>
		);
	};

	handleSearchBox = ({ currentTarget: { value: index } }) => {
		const { total } = this.state;
		let filtered = [];
		if (index) filtered = total.filter(record => record._id.includes(index));
		this.setState({ filtered });
	};

	renderSearchBox() {
		return (
			<form className='form-inline justify-content-end d-flex md-form form-sm h-100'>
				<i className='fa fa-search' aria-hidden='true' />
				<input
					className='form-control form-control-sm ml-2'
					type='text'
					name='search'
					placeholder='Search Index (sc*****)'
					aria-label='Search Index'
					onChange={this.handleSearchBox}
				/>
			</form>
		);
	}

	getRecords() {
		const { total, filtered } = this.state;
		return filtered.length > 0 ? filtered : total;
	}

	render() {
		const { present, total, pdfData } = this.state;

		const records = this.getRecords();

		return !pdfData.items ? (
			<div className='jumbotron py-4'>
				{renderData(present.length, total.length)}

				<div className='col-9'>{this.renderLectureDetails()}</div>

				<div className='row mb-2'>
					<div className='col-8'>{this.renderDownloadPdfButton()}</div>
					<div className='col'>{this.renderSearchBox()}</div>
				</div>

				<table className='table table-hover table-sm'>
					<thead className='thead-dark'>
						<tr>
							<th>Index</th>
							<th>Name</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{records.map(r => (
							<tr key={r._id}>
								<td>{r.firstName}</td>
								<td>{r.username}</td>
								<td>
									{this.isPresent(r._id) ? (
										<i className='fa fa-check-square-o' aria-hidden='true'></i>
									) : (
										<i className='fa fa-square-o' aria-hidden='true'></i>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		) : (
			<AttendancePDF {...pdfData} />
		);
	}
}

export default AttendanceTable;
