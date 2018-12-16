const userText ={
	title: 'All logged users',
	header: 'To all logged users',
	info:'This page is shown only to users with normal user priviledges' + ' This page requires user login'
};

const adminText = {
	title: 'Secret Data',
	header: 'Secret',
	info: 'This page is shown only to users with admin priviledges'
};

const allText ={
	title: 'All Users',
	header: 'To all users',
	info:'This page doesnt require users to login'
};

module.exports = {
	userText, adminText, allText
};
