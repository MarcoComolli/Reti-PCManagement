require(['../ViewModels/Course','../ViewModels/Resource','../ViewModels/Enrollment','../ViewModels/Teacher'], function () {
    requirejs([
        'ConnectionManager',
        'Constants',
        'ViewState',
        'PageManager',
        'ResourcesManager',
        'Main']); //l'ordine con cui vengono specificati E' IMPORTANTE!
});