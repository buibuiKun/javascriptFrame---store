<template>
    <el-row class="tablePage-block">
        <el-col :span="24" class="page">
            <el-pagination v-bind="$attrs"
                           v-on="$listeners"
                           :current-page="currentPage"
                           :page-sizes="pageSizeArr"
                           :total='currentTotal'>
            </el-pagination>
            <span class="page-total">{{'显示第'+' '+ preCurrentSize+ ' ' + '至' + ' '+ nextCurrentSize + ' ' + "项结果，共" +' ' + currentTotal + '项'}}</span>
        </el-col>
    </el-row>
</template>

<script>
export default {
    inheritAttrs: false,
    name: 'tablePage-block',
    props: {
        // 是否需要行数
        isPageSize: {
            type: Boolean,
            default: false
        },
        // 行数集合
        pageSizeList: [Array],
        // 总页数
        currentTotal: [Number],
        // 当前页数
        currentPage: [Number],
        // 当前行数
        pageSize: [Number]
    },
    computed: {
        preCurrentSize() {
            return this.currentPage == 1 ? this.currentPage : (this.currentPage - 1) * this.pageSize + 1
        },
        nextCurrentSize() {
            return this.currentPage * this.pageSize;
        },
        pageSizeArr() {
            let pageArr = [10, 25, 50, 100]
            if(this.isPageSize && (!this.pageSizeList || this.pageSizeList.length == 0)) {
                return pageArr
            } else if(this.isPageSize && (this.pageSizeList && this.pageSizeList.length > 0)) {
                pageArr = this.pageSizeList;
                return pageArr;
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.tablePage-block{
    width: 100%;
    .page{
        width: 100%;
        border:1px solid #dddddd;
        padding: 10px 5px;
        box-sizing: border-box;
        overflow: hidden;
        margin: 20px 0;
        text-align: left;
        /deep/ .el-pagination {
            float: left;
            padding-left: 0;
            box-sizing: border-box;
            .el-select .el-input {
                margin-left: 0;
            }
        }
        .page-total{
            float: right;
            line-height: 32px;
            font-size: 13px;
            color: #333333;
            padding-right: 20px;
        }
    }
}
</style>
