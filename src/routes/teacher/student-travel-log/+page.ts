export const load = ({ url }) => {
	return {
		studentId: url.searchParams.get('student_id') ?? ''
	};
};