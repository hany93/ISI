const axios = require('axios');

// const token = localStorage.getItem('token');
// const tokenParse = JSON.parse(token);

const ExAPI = 'http://localhost:3001';

const getAll = () => {
	return axios.get(`${ExAPI}/users/list`);
};

const getById = (values) => {
	return axios.post(`${ExAPI}/users/getById`, values);
};

// const add = (values) => {
// 	return axios.post(`${ExAPI}/users/add`, values);
// 	//return axios.post(`${ExAPI}/users/add`, values, { headers: { autorization: `Bearer ${tokenParse}` } });
// };

// const dell = (values) => {
// 	//return axios.delete(`${ExAPI}/users/delete/${values['id']}`);
// 	return axios.post(`${ExAPI}/users/delete`, values);
// };

const update = (values) => {
	return axios.put(`${ExAPI}/users/update`, values);
};

const userLog = (values) => {
	return axios.post(`${ExAPI}/users/userLog`, values);
};

const leer = (values) => {
	return axios.post(`${ExAPI}/users/leer`, values);
};

const editFile = (values) => {
	return axios.post(`${ExAPI}/users/editFile`, values);
};

const editFilePdf = (values) => {
	return axios.post(`${ExAPI}/users/editFilePdf`, values);
};

const sendPanoXML = (values) => {
	return axios.post(`${ExAPI}/users/sendPanoXML`, values);
};

const verCarousel = (values) => {
	return axios.post(`${ExAPI}/users/verCarousel`, values);
};

const existObra = (values) => {
	return axios.post(`${ExAPI}/users/existObra`, values);
};

const generateDocx = () => {
	return axios.post(`${ExAPI}/users/generateDocx`);
};

export default ExAPI;
export { getAll, leer, editFile, editFilePdf, sendPanoXML, verCarousel, existObra, userLog, update, getById, generateDocx };
