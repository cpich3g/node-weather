var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Justin'
  };

  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(21, (userObject) => {
  console.log(userObject);
});
