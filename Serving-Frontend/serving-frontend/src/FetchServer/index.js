const axios = require('axios');

// const token = localStorage.getItem('token');
// const tokenParse = JSON.parse(token);

const ExAPI = 'http://localhost:3001';

const getAll = () => {
	//console.log(axios.get(`${ExAPI}/users/list`))
	return axios.get(`${ExAPI}/users/list`);
};

// const getById = () => {
// 	return axios;
// };

// const add = (values) => {
// 	return axios.post(`${ExAPI}/users/add`, values);
// 	//return axios.post(`${ExAPI}/users/add`, values, { headers: { autorization: `Bearer ${tokenParse}` } });
// };

// const dell = (values) => {
// 	//return axios.delete(`${ExAPI}/users/delete/${values['id']}`);
// 	return axios.post(`${ExAPI}/users/delete`, values);
// };

// const update = (id, values) => {
// 	return axios.put(`${ExAPI}/users/update`, id, values);
// };

// const userLog = (values) => {
// 	return axios.post(`${ExAPI}/users/userLog`, values);
// };

const leer = (values) => {
	return axios.post(`${ExAPI}/users/leer`,values);
};

const editFile = (values) => {
	return axios.post(`${ExAPI}/users/editFile`, values);
};

const editFilePdf = (values) => {
	return axios.post(`${ExAPI}/users/editFilePdf`, values);
};

export default ExAPI;
export { getAll, leer, editFile, editFilePdf };
