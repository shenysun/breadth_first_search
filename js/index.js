/**
 * @description: 广度/深度 优先遍历
 * @author: shenysun
 * @Date: 2020/06/11 11:59:15
 */
var breadth_first_search = /** @class */ (function () {
    function breadth_first_search() {
        this.textField = document.getElementById("hello");
        this.list = [];
        if (this.textField)
            this.textField.addEventListener('click', this.main.bind(this));
        this.startIdx = 100;
        this.line = 3;
        this.initList();
    }
    breadth_first_search.prototype.initList = function () {
        for (var i = 0; i < this.line; i++) {
            var tempList = [];
            for (var j = this.startIdx; j < this.startIdx + this.line; j++) {
                tempList.push(j + i * this.line);
            }
            this.list.push(tempList);
        }
        console.log(this.list);
    };
    breadth_first_search.prototype.main = function () {
        this.eggFlag = {};
        this.allCount = 0;
        this.count = 1;
        var startTime = new Date().getTime();
        var startX = Math.floor(Math.random() * this.line);
        var startY = Math.floor(Math.random() * this.line);
        this.eggFlag[this.list[startX][startY]] = true;
        console.log("\u5F00\u59CB\uFF1A " + this.list[startX][startY]);
        this.bfs(new Vector2(startX, startY));
        // this.dfs(new Vector2(startX, startY));
        var endTime = new Date().getTime();
        this.textField.textContent = endTime - startTime + "\u6BEB\u79D2\uFF0C\u603B\u6B21\u6570\uFF1A" + this.allCount + "\uFF0C\u6709\u6548\u6B21\u6570\uFF1A" + this.count;
        console.log("遍历有效次数:" + Object.keys(this.eggFlag).length);
    };
    /**
     * 深度优先遍历
     */
    breadth_first_search.prototype.dfs = function (v2) {
        var tempX = v2.x;
        var tempY = v2.y;
        for (var i = tempX - 1; i <= tempX + 1; i++) {
            for (var j = tempY - 1; j <= tempY + 1; j++) {
                this.allCount++;
                if (i == tempX && j == tempY) {
                    continue;
                }
                // 四个方向
                if (Math.abs(i - tempX) + Math.abs(j - tempY) == 2) {
                    continue;
                }
                if (!this.contain(i, j)) {
                    continue;
                }
                var val = this.list[i][j];
                if (this.eggFlag[val]) {
                    continue;
                }
                this.count++;
                this.eggFlag[val] = true;
                console.log("\u7B2C" + (this.count - 1) + "\u6B21\uFF1A" + this.list[tempX][tempY] + " -> " + val);
                this.dfs(new Vector2(i, j));
            }
        }
    };
    /**
     * 广度优先遍历
     */
    breadth_first_search.prototype.bfs = function (v2) {
        this.eggFlag[this.list[v2.x][v2.y]] = true;
        var quene = [];
        quene.push(v2);
        while (quene.length) {
            var temp = quene.shift();
            var tempX = temp.x;
            var tempY = temp.y;
            for (var i = tempX - 1; i <= tempX + 1; i++) {
                for (var j = tempY - 1; j <= tempY + 1; j++) {
                    this.allCount++;
                    if (i == tempX && j == tempY) {
                        continue;
                    }
                    // 四个方向
                    if (Math.abs(i - tempX) + Math.abs(j - tempY) == 2) {
                        continue;
                    }
                    if (!this.contain(i, j)) {
                        continue;
                    }
                    var val = this.list[i][j];
                    if (this.eggFlag[val]) {
                        continue;
                    }
                    this.count++;
                    this.eggFlag[val] = true;
                    console.log("\u7B2C" + (this.count - 1) + "\u6B21\uFF1A" + this.list[tempX][tempY] + " -> " + val);
                    quene.push(new Vector2(i, j));
                }
            }
        }
    };
    breadth_first_search.prototype.contain = function (tempX, tempY) {
        if (this.list[tempX]) {
            var temp = this.list[tempX][tempY];
            return !isNaN(temp);
        }
        return false;
    };
    return breadth_first_search;
}());
/**
 * @description: 二维数组下标类
 * @author: shenysun
 * @Date: 2020/06/11 12:04:01
 */
var Vector2 = /** @class */ (function () {
    function Vector2(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    return Vector2;
}());
new breadth_first_search();
