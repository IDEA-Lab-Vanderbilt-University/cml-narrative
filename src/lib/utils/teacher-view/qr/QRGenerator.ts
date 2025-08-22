import type { Student } from '$lib/types/teacher-view/Student';

import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export const generateQRCodes = async (students: Student[]) => {
	console.log('Begin Generating QR Codes', students);

	let documentFactory: any = await generatePDFDocument(students);
	documentFactory.save('agent-ids.pdf');
};

const generatePDFDocument = async (students: Student[]) => {
	const doc = new jsPDF();

	return await new Promise(async (resolve, reject) => {
		let x = 10;
		let y = 0;

		let index = 0;

		students.forEach(async (student) => {
			let img = await generateQRCode(student);

			if (index % 4 == 0 && index != 0) {
				doc.addPage();
				y = 10;
			}

			doc
				.setFontSize(20)
				.addImage('/img/logos/SPOT-black.png', 'PNG', x, y + 10, 80 * 0.9, 17.5 * 0.9)
				.addImage(img, 'PNG', x, y + 25, 50, 50, 'qr' + index, 'NONE')
				.setFontSize(18)
				.text(
					'Welcome to SPOT, Agent!',
					x + 130,
					y + 20,
					{
						maxWidth: 140,
						align: 'center'
					}
				)
				.text(student.first_name + ' ' + student.last_name, x + 130, y + 35, {
					maxWidth: 140,
					align: 'center'
				})
				.setFontSize(11)
				.text(
					[
						'You have been selected to become a new agent with',
						'the Solving Problems Of Tomorrow Agency!',
						'Use this credential to log into the SPOT Mainframe!'
					],
					x + 130,
					y + 45,
					{
						maxWidth: 140,
						align: 'center'
					}
				);

			y += 70;
			index += 1;
		});

		resolve(doc);
	});
};

const generateQRCode = async (student: Student) => {
	let student_lite = {
		id: student.id,
	};
	
	let dataString: string = await QRCode.toDataURL(JSON.stringify(student_lite));
	return dataString;
};
