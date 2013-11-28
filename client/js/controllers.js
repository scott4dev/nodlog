function ListCtrl ($scope, LogsService) {

	$scope.logs = LogsService.query();

}

