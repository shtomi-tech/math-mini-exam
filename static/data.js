window.MINI_EXAMS = {
  "mini_01": {
    id: "mini_01",
    title: "基礎ミックス 第1回",
    durationMinutes: 30,
    totalPoints: 100,
    note: "4単元を組み合わせたオリジナル問題です。",
    groups: [
      {
        number: "1",
        title: "式の展開・因数分解",
        tag: "ALGEBRA",
        points: 25,
        questions: [
          {
            id: "m01-1-1", label: "(1)", points: 12, type: "numeric",
            stem: "次の式を $x$ について整理したとき、$x^2$、$x$、定数項の係数をそれぞれ答えよ。\\[ (2x-3)^2-(x+1)(x-1) \\]",
            prompts: ["$x^2$ の係数", "$x$ の係数", "定数項"], answers: ["3", "-12", "10"],
            solution: "$(2x-3)^2-(x+1)(x-1)=4x^2-12x+9-(x^2-1)=3x^2-12x+10$。"
          },
          {
            id: "m01-1-2", label: "(2)", points: 8, type: "numeric",
            stem: "$x^2+5xy+6y^2$ を因数分解すると $(x+ay)(x+by)$ となる。$a<b$ のとき、$a$ と $b$ を答えよ。",
            prompts: ["$a$", "$b$"], answers: ["2", "3"],
            solution: "$2+3=5$、$2\\cdot3=6$ なので $(x+2y)(x+3y)$。"
          },
          {
            id: "m01-1-3", label: "(3)", points: 5, type: "numeric",
            stem: "$(a+b)^2-(a-b)^2$ の $ab$ の係数を答えよ。",
            prompts: ["$ab$ の係数"], answers: ["4"],
            solution: "$(a^2+2ab+b^2)-(a^2-2ab+b^2)=4ab$。"
          }
        ]
      },
      {
        number: "2",
        title: "実数・1次不等式",
        tag: "REAL / INEQUALITY",
        points: 25,
        questions: [
          {
            id: "m01-2-1", label: "(1)", points: 8, type: "numeric",
            stem: "$\\sqrt{72}-\\sqrt{18}=a\\sqrt{2}$ と表せるとき、$a$ を答えよ。",
            prompts: ["$a$"], answers: ["3"],
            solution: "$\\sqrt{72}=6\\sqrt2$、$\\sqrt{18}=3\\sqrt2$ より、差は $3\\sqrt2$。"
          },
          {
            id: "m01-2-2", label: "(2)", points: 9, type: "choice",
            stem: "$|2x-1|\\le5$ を満たす $x$ の範囲として正しいものを選べ。",
            options: ["$x\\le-2$", "$-2\\le x\\le3$", "$-3\\le x\\le2$", "$x\\ge3$"], answer: 1,
            solution: "$-5\\le2x-1\\le5$ より、$-4\\le2x\\le6$。したがって $-2\\le x\\le3$。"
          },
          {
            id: "m01-2-3", label: "(3)", points: 8, type: "numeric",
            stem: "$3(x-2)<2x+5$ の解を $x<c$ と表すとき、$c$ を答えよ。",
            prompts: ["$c$"], answers: ["11"],
            solution: "$3x-6<2x+5$ より $x<11$。"
          }
        ]
      },
      {
        number: "3",
        title: "集合と論理",
        tag: "SETS / LOGIC",
        points: 20,
        questions: [
          {
            id: "m01-3-1", label: "(1)", points: 8, type: "numeric",
            stem: "$U=\\{1,2,\\ldots,10\\}$ とし、$A$ を2の倍数全体、$B$ を3の倍数全体とする。$n(A\\cup B)$ を答えよ。",
            prompts: ["$n(A\\cup B)$"], answers: ["7"],
            solution: "$n(A)=5$、$n(B)=3$、$n(A\\cap B)=1$（6のみ）なので、$5+3-1=7$。"
          },
          {
            id: "m01-3-2", label: "(2)", points: 8, type: "multi",
            stem: "$A=\\{1,2,3,4\\}$、$B=\\{2,4\\}$ とする。正しい記述をすべて選べ。",
            options: ["$B\\subset A$", "$A\\cap B=\\{2,4\\}$", "$A\\cup B=\\{1,2,3,4\\}$", "$A\\subset B$"], answer: [0, 1, 2],
            solution: "$B$ の要素はすべて $A$ に含まれ、共通部分は $\\{2,4\\}$、和集合は $A$ そのもの。$A\\subset B$ は誤り。"
          },
          {
            id: "m01-3-3", label: "(3)", points: 4, type: "choice",
            stem: "「$x<0$ かつ $y<0$」は「$xy>0$」であるための何条件か。",
            options: ["必要条件", "十分条件", "必要十分条件", "必要条件でも十分条件でもない"], answer: 1,
            solution: "両方負なら積は正なので十分条件。ただし積が正でも両方正の場合があるため必要ではない。"
          }
        ]
      },
      {
        number: "4",
        title: "場合の数",
        tag: "COUNTING",
        points: 30,
        questions: [
          {
            id: "m01-4-1", label: "(1)", points: 10, type: "numeric",
            stem: "数字 $1,2,3,4,5$ から異なる4個を使って4桁の偶数を作る。できる数は何個あるか。",
            prompts: ["個数"], answers: ["48"],
            solution: "一の位は2または4の2通り。一の位を決めた後、千・百・十の位は残った4個から順に選ぶので $2\\cdot4\\cdot3\\cdot2=48$ 通り。"
          },
          {
            id: "m01-4-2", label: "(2)", points: 10, type: "numeric",
            stem: "赤玉5個、青玉4個から、赤玉を2個、青玉を1個選ぶ方法は何通りあるか。玉はすべて区別できるものとする。",
            prompts: ["通り"], answers: ["40"],
            solution: "$\\binom52\\binom41=10\\cdot4=40$ 通り。"
          },
          {
            id: "m01-4-3", label: "(3)", points: 10, type: "numeric",
            stem: "格子点 $(0,0)$ から $(3,2)$ まで、右または上だけに進む最短経路を考える。点 $(1,1)$ を通る経路は何通りあるか。",
            prompts: ["通り"], answers: ["6"],
            solution: "$(0,0)$ から $(1,1)$ は $\\binom21=2$ 通り、そこから $(3,2)$ は $\\binom31=3$ 通り。積の法則で $2\\cdot3=6$ 通り。"
          }
        ]
      }
    ]
  }
};
