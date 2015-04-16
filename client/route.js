if ( Meteor.isClient )
{
	Router.route('/profile', function () {
	  this.render('Profile');
	});

	Router.route('/', function () {
	  this.render('Home');
	});

	Router.route('/leaders',function(){
		this.render('leaders');
	});
}