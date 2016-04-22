"use strict";

/**
 * 查找字串所在位置（从 0 开始索引）。
 * @param {string} p_text 待查文本。
 * @param {string} p_pattern 子串。
 * @param {boolean} [p_recursive] 查找所有字串的位置。
 * @returns {Number|Array}
 */
module.exports.boyer_moore = function (p_text, p_pattern, p_recursive)
{

    // 非法字符串，返回 -1。
    if (!p_text || typeof p_text !== "string" || !p_pattern || typeof p_pattern !== "string")
    {
        return -1;
    }
    else
    {
        const recursive = p_recursive || false;
        let result = recursive ? [] : -1;

        const lengthT = p_text.length;
        const lengthP = p_pattern.length;
        const suffixPosition = lengthP - 1;

        const badTable = _badTable(p_pattern);
        const goodIndex = _getGoodIndex(p_pattern);

        let i = 0;
        let shift;
        let badShift = -1;
        let goodShift = -1;
        let goodSuffix = "";
        let currentCharT;
        let currentCharP;
        while (i <= lengthT - lengthP)
        {
            for (let j = lengthP - 1; j >= 0; j--)
            {
                currentCharP = p_pattern[j];
                currentCharT = p_text[i + j];

                if (currentCharP === currentCharT)
                {
                    // 如果全部相等，就输出匹配。
                    if (j === 0)
                    {
                        // 如果需递归查找，则保存结果（并不需要重置 goodSuffix）。
                        if (recursive)
                        {
                            result.push(i);
                        }
                        else
                        {
                            return i;
                        }
                    }
                    else
                    {
                        // 好后缀。
                        goodSuffix = currentCharP + goodSuffix;
                    }
                }
                else
                {
                    // 坏字符。
                    badShift = j - _getBadIndex(currentCharT, badTable);
                    if (goodSuffix !== "")
                    {
                        goodShift = suffixPosition - goodIndex;
                        goodSuffix = "";
                        shift = Math.max(badShift, goodShift);
                    }
                    else
                    {
                        shift = badShift;
                    }
                    break;
                }
            }

            i = i + shift;
        }

        if (recursive && result.length === 0)
        {
            result = -1;
        }

        return result;
    }
};

/**
 * 查找“坏字符”第一次出现的位置。
 */
function _getBadIndex(p_char, p_badTable)
{
    const index = p_badTable[p_char];
    return (index === undefined) ? -1 : index;
}

/**
 * 计算“坏字符规则表”。
 */
function _badTable(p_pattern)
{
    let char;
    let result = {};
    for (let i = 0; i < p_pattern.length; i++)
    {
        char = p_pattern[i];
        if (result[char] === undefined)
        {
            result[char] = i;
        }
    }
    return result;
}

/**
 * 计算“好后缀规则表”，实际上就是一个整数值。
 */
function _getGoodIndex(p_pattern)
{
    let goodIndex = -1;

    let affix;
    let suffix;
    let subAffix;
    let lengthAffix;
    let lengthSuffix;
    const lengthP = p_pattern.length;
    for (let i = lengthP - 1; i > 0; i--)
    {
        affix = p_pattern.slice(0, i);
        suffix = p_pattern.slice(i);
        lengthAffix = affix.length;
        lengthSuffix = suffix.length;

        subAffix = affix.slice(0, lengthSuffix);
        if (subAffix === suffix)
        {
            // 从最短的后缀找起，如果找到与 pattern 的首位匹配，直接结束。
            goodIndex = lengthSuffix - 1;
            break;
        }
        else
        {
            for (let j = 1; j < lengthAffix - lengthSuffix + 1; j++)
            {
                subAffix = affix.slice(j, j + lengthSuffix);
                if (subAffix === suffix)
                {
                    if (goodIndex === -1)
                    {
                        goodIndex = j + lengthSuffix - 1;
                    }
                    else
                    {
                        // 在没有找到首位出现的情况下，取最小值。
                        goodIndex = Math.min(goodIndex, j + lengthSuffix - 1);
                    }
                    break;
                }
            }
        }
    }

    return goodIndex;
}
