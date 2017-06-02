app.controller('fileTransferController', function($scope, $http, mainFactory, $stateParams, $state, $window, $cordovaFileTransfer, Trainer) {

	$scope.upload = function(file) {
		console.log(file)
		var options = {
			filekey: "fileSet",
			fileName: "set.csv",
			chunkedMode: "false",
			mimeType: "set/png"
		}
		console.log($cordovaFileTransfer)
		$cordovaFileTransfer.upload("path-to-server-you-want-files-uploaded-to", "path-to-file-you-want-to-upload", options).then(function(result){
			console.log('Success: ' + JSON.stringify(result.response));
		}, function(error){
			console.log("Error: "+error)
		});
	}
})