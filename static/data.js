window.MINI_EXAMS = {
  "mini_01": {
    id: "mini_01",
    title: "基礎ミックス 第1回",
    seriesTotal: 6,
    seriesNumber: 1,
    units: ["式の展開・因数分解", "実数・1次不等式", "集合と論理", "場合の数"],
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
            prompts: ["二次の係数", "一次の係数", "定数項"], answers: ["3", "-12", "10"],
            solution: "$(2x-3)^2-(x+1)(x-1)=4x^2-12x+9-(x^2-1)=3x^2-12x+10$。"
          },
          {
            id: "m01-1-2", label: "(2)", points: 8, type: "numeric",
            stem: "$x^2+5xy+6y^2$ を因数分解すると $(x+ay)(x+by)$ となる。$a\\lt b$ のとき、$a$ と $b$ を答えよ。",
            prompts: ["小さい方", "大きい方"], answers: ["2", "3"],
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
            stem: "$\\sqrt{72}-\\sqrt{18}=a\\sqrt{2}$ と表せるとき、係数を答えよ。",
            prompts: ["係数"], answers: ["3"],
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
            stem: "$3(x-2)<2x+5$ の解を $x\\lt c$ と表すとき、境界値を答えよ。",
            prompts: ["境界値"], answers: ["11"],
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
  },
  "mini_02": {
    id: "mini_02",
    title: "基礎ミックス 第2回",
    seriesTotal: 6,
    seriesNumber: 2,
    units: ["式の展開・因数分解", "実数・1次不等式", "集合と論理", "場合の数"],
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
            id: "m02-1-1", label: "(1)", points: 12, type: "numeric",
            stem: "$A=2x^2-3x+4$、$B=x^2+2x-1$ とする。$A+kB$ の $x$ の係数が $1$ になるとき、$k$ の値を求めよ。さらに、このときの $x^2$ の係数と定数項を答えよ。",
            prompts: ["$k$", "二次の係数", "定数項"], answers: ["2", "4", "2"],
            solution: "$A+kB=(2+k)x^2+(-3+2k)x+(4-k)$。$x$ の係数について $-3+2k=1$ より $k=2$。したがって $A+2B=4x^2+x+2$ なので、$x^2$ の係数は $4$、定数項は $2$。"
          },
          {
            id: "m02-1-2", label: "(2)", points: 8, type: "choice",
            stem: "$6a^2b-9ab^2$ を因数分解した式として正しいものを選べ。",
            options: ["$3ab(2a-3b)$", "$3ab(2a+3b)$", "$3ab(3a-2b)$", "$ab(6a-3b)$"], answer: 0,
            solution: "2項の共通因数は $3ab$ である。$6a^2b\\div3ab=2a$、$-9ab^2\\div3ab=-3b$ より、$6a^2b-9ab^2=3ab(2a-3b)$。"
          },
          {
            id: "m02-1-3", label: "(3)", points: 5, type: "numeric",
            stem: "$x+y=5$、$xy=3$ のとき、$x^2+y^2$ の値を答えよ。",
            prompts: ["$x^2+y^2$"], answers: ["19"],
            solution: "$x^2+y^2=(x+y)^2-2xy=25-6=19$。"
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
            id: "m02-2-1", label: "(1)", points: 8, type: "numeric",
            stem: "$\\dfrac{1}{\\sqrt{5}-2}$ を有理化すると $a+\\sqrt{b}$（$a,b$ は自然数）の形になる。$a$ と $b$ を答えよ。",
            prompts: ["$a$", "$b$"], answers: ["2", "5"],
            solution: "分母分子に $\\sqrt5+2$ を掛けると、分母は $5-4=1$。よって $\\sqrt5+2=2+\\sqrt5$。"
          },
          {
            id: "m02-2-2", label: "(2)", points: 9, type: "choice",
            stem: "$|x-3|>2$ を満たす $x$ の範囲として正しいものを選べ。",
            options: ["$1\\lt x\\lt5$", "$x\\lt1$ または $x\\gt5$", "$x\\gt5$", "$x\\lt-1$ または $x\\gt5$"], answer: 1,
            solution: "$x-3>2$ または $x-3<-2$ より、$x>5$ または $x<1$。不等号の向きが $>$ なので範囲は外側になる。"
          },
          {
            id: "m02-2-3", label: "(3)", points: 8, type: "numeric",
            stem: "連立不等式 $\\begin{cases} 2x+1>x-3 \\\\ 5-x\\ge2x-4 \\end{cases}$ を満たす整数 $x$ は何個あるか。",
            prompts: ["個数"], answers: ["7"],
            solution: "1つ目から $x>-4$、2つ目から $9\\ge3x$ すなわち $x\\le3$。よって $-4<x\\le3$ で、整数は $-3$ から $3$ の7個。"
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
            id: "m02-3-1", label: "(1)", points: 8, type: "numeric",
            stem: "$1$ から $100$ までの自然数のうち、$4$ の倍数でも $6$ の倍数でもないものは何個あるか。",
            prompts: ["個数"], answers: ["67"],
            solution: "4の倍数は25個、6の倍数は16個、共通（12の倍数）は8個。和集合は $25+16-8=33$ 個なので、$100-33=67$ 個。"
          },
          {
            id: "m02-3-2", label: "(2)", points: 8, type: "multi",
            stem: "$U=\\{1,2,\\ldots,8\\}$ を全体集合とし、$A=\\{1,2,3,4\\}$、$B=\\{3,4,5,6\\}$ とする。正しい記述をすべて選べ。",
            options: ["$\\overline{A}=\\{5,6,7,8\\}$", "$A\\cap B=\\{3,4\\}$", "$\\overline{A}\\cap\\overline{B}=\\{7,8\\}$", "$A\\cup B=U$"], answer: [0, 1, 2],
            solution: "$\\overline A=\\{5,6,7,8\\}$、$A\\cap B=\\{3,4\\}$。$A\\cup B=\\{1,\\ldots,6\\}$ なので $\\overline{A}\\cap\\overline{B}=\\overline{A\\cup B}=\\{7,8\\}$。$7,8$ が入らないため $A\\cup B=U$ は誤り。"
          },
          {
            id: "m02-3-3", label: "(3)", points: 4, type: "choice",
            stem: "命題「$x=2$ ならば $x^2=4$」と、その逆の真偽の組合せとして正しいものを選べ。",
            options: ["もとの命題も逆も真", "もとの命題は真、逆は偽", "もとの命題は偽、逆は真", "もとの命題も逆も偽"], answer: 1,
            solution: "もとの命題は真。逆「$x^2=4$ ならば $x=2$」は $x=-2$ が反例となり偽。"
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
            id: "m02-4-1", label: "(1)", points: 10, type: "numeric",
            stem: "大人2人と子ども3人の計5人が一列に並ぶ。両端が大人になる並び方は何通りあるか。",
            prompts: ["通り"], answers: ["12"],
            solution: "両端の大人の並び方が $2!=2$ 通り、間の子ども3人の並び方が $3!=6$ 通り。積の法則で $2\\cdot6=12$ 通り。"
          },
          {
            id: "m02-4-2", label: "(2)", points: 10, type: "numeric",
            stem: "男子6人、女子4人の中から4人を選ぶ。女子がちょうど2人含まれる選び方は何通りあるか。",
            prompts: ["通り"], answers: ["90"],
            solution: "女子の選び方 $\\binom42=6$ 通り、男子の選び方 $\\binom62=15$ 通り。積の法則で $6\\cdot15=90$ 通り。"
          },
          {
            id: "m02-4-3", label: "(3)", points: 10, type: "numeric",
            stem: "$72$ の正の約数は全部で何個あるか。",
            prompts: ["個数"], answers: ["12"],
            solution: "$72=2^3\\cdot3^2$ なので、約数の個数は $(3+1)(2+1)=12$ 個。"
          }
        ]
      }
    ]
  }
};
