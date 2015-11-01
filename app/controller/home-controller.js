angular.module('app')

.controller("HomeController", HomeController)

.factory("HomeService", HomeService);

HomeController.$inject = ['HomeService'];

function HomeController(HomeService) {
    var vm = this;
    vm.operationDate = new Date();
    vm.pageTitle = "K-Manager";
    vm.add_income = {};
    vm.add_outcome = {};

    /* flags variables*/
    vm.operation = false;
    vm.currentOperation = ""; /* available operations:  add_income , add_outcome , take_kadam , give_kadam */

    activate();

    /* Public funtion declarations */
    vm.startOperation = startOperation;
    vm.backButtonClick = backButtonClick;
    vm.addIncome = addIncome;
    vm.addOutcome = addOutcome;

    /* funtion declarations */

    /* Initialize all requied : database */
    function activate() {
        HomeService.createDataBase();
        /*HomeService.addIncome(312, new Date().getTime(), "kakes");*/
    }

    function initializeAddIncome() {
        vm.add_income.created = new Date();
        vm.add_income.amount = 0;
    }

    function initializeAddOutcome() {
        vm.add_outcome.created = new Date();
        vm.add_outcome.amount = 0;
    }

    function startOperation(operation) {
        initializeAddIncome();
        initializeAddOutcome();
        vm.pageTitle = operation.split('_')[0] + " " + operation.split('_')[1];
        vm.currentOperation = operation;
        vm.operation = true;
    }

    function addIncome() {
        HomeService.addIncome(vm.add_income.amount, vm.add_income.created.getTime(), vm.add_income.from_name).then(function(response) {
            if (response) {
                alert("success");
            } else {
                alert("failed");
            }
            backButtonClick();
        });
    }

    function addOutcome() {
        HomeService.addOutcome(vm.add_outcome.amount, vm.add_outcome.created.getTime(), vm.add_outcome.for_name).then(function(response) {
            if (response) {
                alert("success");
            } else {
                alert("failed");
            }
            backButtonClick();
        });
    }

    function backButtonClick() {
        vm.currentOperation = "";
        vm.operation = false;
        vm.pageTitle = "K-Manager";
    }
}

HomeService.$inject = ['$q', '$webSql'];

function HomeService($q, $webSql) {
    var db;
    var incomeTable = 'tbl_income';
    var outcomeTable = 'tbl_outcome';
    var HomeService = {
        createDataBase: createDataBase,
        addIncome: addIncome,
        addOutcome: addOutcome
    };
    return HomeService;

    function createDataBase() {
        db = $webSql.openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
        createTable();
    }

    function createTable() {
        db.createTable(incomeTable, {
            "id": {
                "type": "INTEGER",
                "null": "NOT NULL", // default is "NULL" (if not defined)
                "primary": true, // primary
                "auto_increment": true // auto increment
            },
            "amount": {
                "type": "FLOAT",
                "null": "NOT NULL",
                "default": "0"
            },
            "created": {
                "type": "TIMESTAMP",
                "null": "NOT NULL",
                "default": "CURRENT_TIMESTAMP" // default value
            },
            "from_name": {
                "type": "TEXT",
                "null": "NOT NULL"
            }
        });

        db.createTable(outcomeTable, {
            "id": {
                "type": "INTEGER",
                "null": "NOT NULL", // default is "NULL" (if not defined)
                "primary": true, // primary
                "auto_increment": true // auto increment
            },
            "amount": {
                "type": "FLOAT",
                "null": "NOT NULL",
                "default": "0"
            },
            "created": {
                "type": "TIMESTAMP",
                "null": "NOT NULL",
                "default": "CURRENT_TIMESTAMP" // default value
            },
            "for_name": {
                "type": "TEXT",
                "null": "NOT NULL"
            }
        });
    }

    function addIncome(amount, date, from_name) {
        var deferred = $q.defer();
        db.insert(incomeTable, {
            "amount": amount,
            "created": date,
            'from_name': from_name
        }).then(function(results) {
            if (results.insertId && results.insertId >= 0) {
                deferred.resolve(true);
            } else {
                deferred.resolve(false);
            }
        });
        return deferred.promise;
    }

    function addOutcome(amount, date, for_name) {
        var deferred = $q.defer();
        db.insert(outcomeTable, {
            "amount": amount,
            "created": date,
            'for_name': for_name
        }).then(function(results) {
            if (results.insertId && results.insertId >= 0) {
                deferred.resolve(true);
            } else {
                deferred.resolve(false);
            }
        });
        return deferred.promise;
    }

    function sample(student_id) {
        var deferred = $q.defer();
        deferred.resolve(response.data);
        return deferred.promise;
    }
}