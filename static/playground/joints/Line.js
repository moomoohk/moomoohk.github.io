class Line {
    constructor(a, b) {
        this.point1 = a;
        this.point2 = b;

        this.xMin = a.x < b.x ? a.x : b.x;
        this.xMax = a.x > b.x ? a.x : b.x;

        this.yMin = a.y < b.y ? a.y : b.y;
        this.yMax = a.y > b.y ? a.y : b.y;

        this.m = (this.point1.y - this.point2.y) / (this.point1.x - this.point2.x);
        this.a = this.point1.y - (this.m * this.point1.x);
    }


    getY(x) {
        return this.m * x + this.a;
    }

    intersects(other) {
        let p = this.point1;
        let p2 = this.point2;
        let q = other.point1;
        let q2 = other.point2;

        let r = Line.subtractPoints(p2, p);
        let s = Line.subtractPoints(q2, q);

        let uNumerator = Line.crossProduct(Line.subtractPoints(q, p), r);
        let denominator = Line.crossProduct(r, s);

        if (uNumerator == 0 && denominator == 0) {
            // They are coLlinear

            // Do they touch? (Are any of the points equal?)
            if (Line.equalPoints(p, q) || Line.equalPoints(p, q2) || Line.equalPoints(p2, q) || Line.equalPoints(p2, q2)) {
                return true
            }
            // Do they overlap? (Are all the point differences in either direction the same sign)
            return !Line.allEqual(
                    (q.x - p.x < 0),
                    (q.x - p2.x < 0),
                    (q2.x - p.x < 0),
                    (q2.x - p2.x < 0)) || !Line.allEqual(
                    (q.y - p.y < 0),
                    (q.y - p2.y < 0),
                    (q2.y - p.y < 0),
                    (q2.y - p2.y < 0));
        }

        if (denominator == 0) {
            // lines are paralell
            return false;
        }

        let u = uNumerator / denominator;
        let t = Line.crossProduct(Line.subtractPoints(q, p), s) / denominator;

        return (t >= 0) && (t <= 1) && (u >= 0) && (u <= 1);
    }

    static crossProduct(point1, point2) {
        return point1.x * point2.y - point1.y * point2.x;
    }

    static subtractPoints(point1, point2) {
        let result = {};
        result.x = point1.x - point2.x;
        result.y = point1.y - point2.y;

        return result;
    }

    static equalPoints(point1, point2) {
        return (point1.x == point2.x) && (point1.y == point2.y)
    }

    static allEqual(args) {
        let firstValue = arguments[0],
            i;
        for (i = 1; i < arguments.length; i += 1) {
            if (arguments[i] != firstValue) {
                return false;
            }
        }
        return true;
    }
}