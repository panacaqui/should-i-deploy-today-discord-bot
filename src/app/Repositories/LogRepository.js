function numberWithTwoCharacters(number) {
    return number.toString().padStart(2, '0');
}

class LogRepository {
    async list() {
        return new Promise((resolve) => {
            resolve([]);
        });
    }

    create({ message, code, data }) {
        if (!message) {
            return null;
        }

        this.code = code;
        this.message = message;
        this.data = data;
        this.createdAt = new Date();

        return this;
    }

    toJSON() {
        return {
            code: this.code,
            message: this.message,
            data: this.data,
            createdAt: this.createdAt
        };
    }

    toString() {
        return `\n${this.printDate()}\nCódigo: **${this.code} - ${this.message}**\n${this.printData()}`;
    }

    printDate() {
        const day = numberWithTwoCharacters(this.createdAt.getDate());
        const month = numberWithTwoCharacters(this.createdAt.getMonth() + 1);
        const year = this.createdAt.getFullYear();
        const hours = numberWithTwoCharacters(this.createdAt.getHours());
        const minutes = numberWithTwoCharacters(this.createdAt.getMinutes());
        const seconds = numberWithTwoCharacters(this.createdAt.getSeconds());

        return `**${day}/${month}/${year} às ${hours}:${minutes}:${seconds}**`;
    }

    printData() {
        if (!this.data) {
            return '';
        }

        let returnValue = '';

        Object.keys(this.data).forEach((key) => {
            if (typeof this.data[key] === 'object') {
                returnValue += `\n${key}: ${JSON.stringify(this.data[key])}`;
            } else {
                returnValue += `\n${key}: ${this.data[key]}`;
            }
        });

        return "```" + returnValue + "```";
    }
}

module.exports = new LogRepository();
