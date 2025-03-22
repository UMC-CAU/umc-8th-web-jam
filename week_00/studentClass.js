class Student {
	constructor(name, school) {
		this._name = name;       // _를 추가해야 아래 get name()에 의도치 않게 읽히는 경우 없음
		this._school = school;
	}

	// Getter: 이름을 읽을 때 자동 실행
	get name() {
		return this._name.toUpperCase(); // 예: 항상 대문자로 반환
	}

	// Setter: 이름을 바꿀 때 자동 실행
	set name(newName) {
		this._name = newName.trim(); // _ 없이 하면 this.name에서 set name()으로 읽어 무한 호출에 빠짐
	}

	// 일반 메서드
	introduction() {
		console.log(`안녕하세요, ${this.name}입니다. ${this._school}에 다니고 있습니다.`);
	}
}

const jaemin = new Student('JAEMIN', '중앙대학교');

console.log(jaemin.name); // "JAEMIN" → getter 작동
jaemin.introduction(); // 안녕하세요, JAEMIN입니다. 중앙대학교에 다니고 있습니다.
jaemin.name = '   jm   '; // setter 작동 → 자동으로 공백 제거
console.log(jaemin.name); // "jm"
jaemin.introduction();    // 안녕하세요, JM입니다. 중앙대학교에 다니고 있습니다.

