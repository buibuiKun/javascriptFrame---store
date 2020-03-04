<template>
    <el-row class="tableOptConfig">
        <el-col :span="24">
            <el-table :data="tbodyData" tooltip-effect="dark" border stripe  v-bind="$attrs"
                        highlight-current-row style="width: 100%" ref="table" @selection-change="moreSelectHandled">
                <template v-for="(thItem, thIndex) in theadData">
                    <!-- 多选 -->
                    <el-table-column v-if="thItem.type && thItem.type == 'selection'"
                                     type="selection" :key="`cell-${thIndex}-${(+new Date())}`"
                                     :width="thItem.width"
                                     :fixed="thItem.fixed || false"
                                     :align="thItem.align || 'center'"
                                     :selectable="selectable">
                    </el-table-column>
                    <!-- 单选 -->
                    <el-table-column v-if="thItem.type && thItem.type == 'radio'"
                                     :label="thItem.label" :props="thItem.props" :width="thItem.width"
                                     :fixed="thItem.fixed || false" :key="`cell-${thIndex}-${(+new Date())}`"
                                     :align="thItem.align || 'center'">
                        <template slot-scope="scope">
                            <div class="radio-type">
                                <el-radio v-model="radioCheckIndex" :label="scope.row.index"
                                      :disabled="scope.row.disabled || false"
                                      @change.native="$emit('radioChangeHandle', scope.row, scope.$index, thItem, thIndex, $event)">{{''}}</el-radio>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- 序号 -->
                    <el-table-column :label="thItem.label" :key="`cell-${thIndex}-${(+new Date())}`"
                                     v-if="thItem.type && thItem.type == 'index'" :sortable="thItem.sortable || false"
                                     :props="thItem.props" :width="thItem.width" :sort-method="sortChange"
                                     :fixed="thItem.fixed || false" :align="thItem.align || 'center'">
                        <template slot-scope="scope">
                            <span>{{scope.row[thItem.props]}}</span>
                        </template>
                    </el-table-column>
                    <!-- 列数据 -->
                    <el-table-column v-if="thItem.type && thItem.type == 'cellMain'" :key="`cell-${thIndex}-${(+new Date())}`"
                                     :label="thItem.label" :fixed="thItem.fixed || false" :sortable="thItem.sortable || false"
                                     :props="thItem.props" :width="thItem.width" :minWidth="thItem.minWidth" :sort-method="thItem.methodFn"
                                     :align="thItem.align || 'center'" :show-overflow-tooltip="thItem.isTitle">
                        <template slot-scope="scope" >
                            <span :class="['cell-text', thItem.className]"  @click.stop="thItem.isHandle ? $emit('operateEvent', scope.row, scope.$index, scope, thItem, $event ) : null">{{scope.row[thItem.props]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" :key="`cell-${thIndex}-${(+new Date())}`"
                                     :width="thItem.width" :minWidth="thItem.minWidth ? thItem.minWidth : thItem.width ? thItem.width : '120'"
                                     v-if="thItem.type && thItem.type == 'operate'" :fixed="thItem.fixed || false">
                        <template slot-scope="scope">
                            <template v-for="(btnItem, btnIndex) in scope.row[thItem.props]">
                                <el-button :key="btnIndex"
                                            :class="btnItem.className"
                                            v-if="btnItem.isShow"
                                            @click.native="$emit('operateEvent', scope.row, scope.$index, scope, thItem, $event, btnItem, btnIndex)"
                                            :type="btnItem.type || 'default'"
                                            :size="btnItem.size || 'small'">{{btnItem.name}}</el-button>
                            </template>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
        </el-col>
    </el-row>
</template>

<script>
export default {
    inheritAttrs:false,
    name: 'table-config',
    props: {
        theadData: [Array],
        tbodyData: [Array],
        radioCheckIdx: [Number]
    },
    data() {
        return {
            radioCheckIndex: this.radioCheckIdx
        }
    },
    methods: {
        moreSelectHandled(val) {
            this.$emit('handleSelectionChange', val);
        },
        // 多选表格，清空用户的选择
        clearSelectTable() {
            this.$refs.table.clearSelection();
        },
        // 多选表格,设置这一行选中与否
        toggleSelectTable(row, judge) {
            this.$refs.table.toggleRowSelection(row, judge);
        },
        // 是否禁用某些
        selectable(row, index) {
            if(row.isDiasbled && row.isDiasbled != false) { 
                return false;
            }
            return true
        },
        sortChange(a, b) {
            return a['index'] - b['index'];
        }
    },
}
</script>


<style lang="scss" scoped>
.tableOptConfig {
    width: auto;
    /deep/ .el-table {
        width: 100%;
        border-color: #cccccc;
        th, td {
            padding: 5px 0;
            border-color: #cccccc;
        }
        &::before, 
        &::after {
            background-color: #cccccc;
        }
        .el-table__fixed-right::before, .el-table__fixed::before {
            background-color: #cccccc;
        }
        .el-table__header th {
            background-color: #e7e7e7;
            font-size: 13px;
            font-weight: 500;
            color: #130101;
        }
        .cell-title{
            font-size: 13px !important;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /*!autoprefixer:off*/
            -webkit-box-orient: vertical;
            /*autoprefixer:on*/
            cursor: pointer;
            line-height: 20px !important;
        }
    }
}
</style>

<style lang="scss">
div.el-tooltip__popper {
    width: 20%;
}

</style>