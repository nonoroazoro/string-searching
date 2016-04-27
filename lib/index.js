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
    if (!p_text || typeof p_text !== "string" || p_text === "" || !p_pattern || typeof p_pattern !== "string" || p_pattern === "")
    {
        return -1;
    }
    else
    {
        const recursive = p_recursive || false;
        let result = recursive ? [] : -1;

        const lengthT = p_text.length;
        const lengthP = p_pattern.length;

        const badCharacters = _badCharacters(p_pattern);
        const goodSuffixes = _goodSuffixes(p_pattern);

        let i = 0;
        let shift;
        let goodShift;
        let currentCharT;
        let currentCharP;
        const n = lengthT - lengthP;
        while (i <= n)
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
                        // 如果需递归查找，则保存结果。
                        if (recursive)
                        {
                            result.push(i);
                        }
                        else
                        {
                            return i;
                        }
                    }
                }
                else
                {
                    // 先按坏字符来计算位移。
                    shift = j - _getBadIndex(currentCharT, badCharacters);

                    // 如果出现好后缀，则计算是否按好后缀来位移。
                    if (j !== lengthP - 1)
                    {
                        goodShift = _getGoodShift((lengthP - 1) - (j + 1), goodSuffixes, lengthP);
                        shift = goodShift > shift ? goodShift : shift;
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
function _getBadIndex(p_char, p_badCharacters)
{
    const index = p_badCharacters[p_char];
    return (index === undefined) ? -1 : index;
}

/**
 * 计算“坏字符规则表”。
 * 规则：计算 Pattern 中每一个字符的索引。如果出现重复的字符，以最右侧的字符索引为准。
 */
function _badCharacters(p_pattern)
{
    const result = {};
    const length = p_pattern.length;
    for (let i = 0; i < length; i++)
    {
        result[p_pattern[i]] = i;
    }
    return result;
}

/**
 * 计算“好字符”位移。
 */
function _getGoodShift(p_index, p_goodSuffixes, p_lengthP)
{
    let result = p_goodSuffixes[p_index];

    if (result === undefined)
    {
        result = p_goodSuffixes[p_goodSuffixes.length - 1];
    }

    if (result === undefined)
    {
        result = p_lengthP;
    }

    return result;
}

/**
 * 计算“好后缀规则表”，记录了所有后缀的位移。该数组的“索引 = 当前搜索到的“好后缀”的长度 - 1”，例如：好后缀“MPLE”，[3] 为对应的偏移值。
 * 规则：
 * 数组元素按“好后缀”从短到长排序，索引即：length - 1，取到的值就是 shift。例如：好后缀“E”，就是 [0]。
 * 这里为了节省资源，并没有保存所有“好后缀”的 shift。
 * 因此当未找到指定的“好后缀”对应的 shift 时，shift = lengthP。
 */
function _goodSuffixes(p_pattern)
{
    const result = [];

    let shift;
    let suffix;
    let subPrefix;
    let prefix;
    let lengthSuffix;
    const lengthP = p_pattern.length;

    // 从最短的 suffix 开始遍历。
    for (let i = lengthP - 1; i >= 1; i--)
    {
        suffix = p_pattern.slice(i);
        prefix = p_pattern.slice(0, i);
        lengthSuffix = suffix.length;

        shift = -1;
        // 从 prefix 的右侧向左侧查询。
        for (let j = prefix.length; j >= lengthSuffix ; j--)
        {
            subPrefix = prefix.slice(j - lengthSuffix, j);
            if (subPrefix === suffix)
            {
                shift = lengthP - j;
                break;
            }
        }

        if (shift === -1)
        {
            // 遇到第一个不重复的 suffix 后，后续 suffix 都不用查了，肯定是不重复，都是 -1。
            break;
        }
        else
        {
            // DEBUG: result[suffix] = shift;
            result.push(shift);
        }
    }
    return result;
}