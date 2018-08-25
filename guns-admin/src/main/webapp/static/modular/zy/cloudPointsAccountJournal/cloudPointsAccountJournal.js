/**
 * cloudpoints管理初始化
 */
var CloudPointsAccountJournal = {
    id: "CloudPointsAccountJournalTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
CloudPointsAccountJournal.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '主键id', field: 'id', visible: false, align: 'center', valign: 'middle'},
            {title: '用户id', field: 'userId', visible: false, align: 'center', valign: 'middle'},
            {title: '描述', field: 'description', visible: true, align: 'center', valign: 'middle'},
            {title: '分值', field: 'points', visible: true, align: 'center', valign: 'middle'},
            {title: '时间', field: 'dateTime', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
CloudPointsAccountJournal.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        CloudPointsAccountJournal.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加cloudpoints
 */
CloudPointsAccountJournal.openAddCloudPointsAccountJournal = function () {
    var index = layer.open({
        type: 2,
        title: '添加cloudpoints',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/cloudPointsAccountJournal/cloudPointsAccountJournal_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看cloudpoints详情
 */
CloudPointsAccountJournal.openCloudPointsAccountJournalDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: 'cloudpoints详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/cloudPointsAccountJournal/cloudPointsAccountJournal_update/' + CloudPointsAccountJournal.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除cloudpoints
 */
CloudPointsAccountJournal.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/cloudPointsAccountJournal/delete", function (data) {
            Feng.success("删除成功!");
            CloudPointsAccountJournal.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("cloudPointsAccountJournalId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询cloudpoints列表
 */
CloudPointsAccountJournal.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    CloudPointsAccountJournal.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = CloudPointsAccountJournal.initColumn();
    var table = new BSTable(CloudPointsAccountJournal.id, "/cloudPointsAccountJournal/list", defaultColunms);
    table.setPaginationType("client");
    CloudPointsAccountJournal.table = table.init();
});
