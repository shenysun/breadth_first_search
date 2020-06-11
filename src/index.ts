/**
 * @description: 广度优先遍历
 * @author: shenysun
 * @Date: 2020/06/11 11:59:15
 */
class breadth_first_search {
    private textField: HTMLElement | null;
    private list: Array<Array<number>>;
    private eggFlag: Object; // 遍历标识
    private startIdx: number;
    private line: number; // 行数
    private allCount: number; // 验证遍历总次数
    private count: number;// 有效次数

    constructor() {
        this.textField = document.getElementById("hello");
        this.list = [];
        if (this.textField)
            this.textField.addEventListener('click', this.main.bind(this));
        this.startIdx = 100;
        this.line = 80;
        this.initList();
    }

    private initList(): void {
        for (let i = 0; i < this.line; i++) {
            var tempList = [];
            for (let j = this.startIdx; j < this.startIdx + this.line; j++) {
                tempList.push(j + i * this.line);
            }
            this.list.push(tempList);
        }
    }

    private main(): void {
        this.eggFlag = {};
        this.allCount = 0;
        this.count = 1;
        var startTime: number = new Date().getTime();
        var startX: number = Math.floor(Math.random() * this.line);
        var startY: number = Math.floor(Math.random() * this.line);
        this.eggFlag[this.list[startX][startY]] = true;
        this.bfs_normal(new Vector2(startX, startY));
        // this.bfs_recursive(new Vector2(startX, startY));
        var endTime: number = new Date().getTime();
        this.textField.textContent = `${endTime - startTime}毫秒，总次数：${this.allCount}，有效次数：${this.count}`;
        console.log(Object.keys(this.eggFlag).length);
    }

    /**
     * 递归
     */
    private bfs_recursive(v2: Vector2): void {
        var tempX: number = v2.x;
        var tempY: number = v2.y;
        for (let i = tempX - 1; i <= tempX + 1; i++) {
            for (let j = tempY - 1; j <= tempY + 1; j++) {
                this.allCount++;
                if (i == tempX && j == tempY) {
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
                this.bfs_recursive(new Vector2(i, j));
            }
        }
    }

    /**
     * 非递归
     */
    private bfs_normal(v2: Vector2): void {
        this.eggFlag[this.list[v2.x][v2.y]] = true;
        var quene: Array<Vector2> = [];
        quene.push(v2);
        while (quene.length) {
            var temp: Vector2 = quene.shift();
            var tempX = temp.x;
            var tempY = temp.y;
            for (let i = tempX - 1; i <= tempX + 1; i++) {
                for (let j = tempY - 1; j <= tempY + 1; j++) {
                    this.allCount++;
                    if (i == tempX && j == tempY) {
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
                    quene.push(new Vector2(i, j));
                }
            }
        }
    }

    private contain(tempX: number, tempY: number): boolean {
        if (this.list[tempX]) {
            var temp = this.list[tempX][tempY];
            return !isNaN(temp)
        }
        return false;
    }
}

/**
 * @description: 二维数组下标类
 * @author: shenysun
 * @Date: 2020/06/11 12:04:01
 */
class Vector2 {
    constructor(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }
    x: number;
    y: number;
}
new breadth_first_search();