/**
 * A class which generates random strings using a templating language with the following rules.
 * 1. Any line that starts with '-' is treated as a comment, and is ignored regardless of content.
 * 2. Catgories begin with a line that starts with '#' and ends with ':', the characters between those two lines becomes the category name.
 * 3. Category names, and references to them, are case insensitive.
 * 4. Every line after the category name line will be added to that category, until a new category name is defined, or end of file.
 * 5. The "template" category is the only required category, as that is treated as the entry point for text generation.
 * 6. You can make a reference to another category by using the syntax |<category name>|
 * 7. If you use the letter 'a' as a word, mark it with <a>, and it will be turned into 'a' or 'an' appropriately.
 * 8. You can make a "pick one" syntax by putting an array of suitable words in a sentence. 
 *    For example: [colorless, |color|] would pick either "colorless" or a word from the color category.
 * 9. If you reference a category which is not defined, the text will be left as |<undefined category name>|
 */
class SentenceGen {

    /**
     * 
     * @param {String} data A string which contains categories defined with SentenceGen syntax.
     */
    constructor(data) {
        this.categories = this.parseCategories(data)
        
        // define shared regex
        this.regex = {
            categoryRef: /\|[\w\- \.]+\|/, // don't want global, break at first match.
            aOrAn: /<a>/,
            pickOne: /\[[\w, \|]+\]/
        }
    }

    /**
     * Generates a random string from the templates and categories stored in this instance.
     * @returns {String} A sentence generated at random.
     */
    generateSentence()
    {
        let template = this.pickFrom("template")
        while (this.parsingRequired(template))
        {
            template = this.reduceCategories(template)
            template = this.resolveAllPickers(template)
            template = this.resolveAnChecks(template)
        }
        template = this.applyGrammar(template)
        return template
    }

    /*
     * TODO: Track state during sentence generation, this will allow me to
     * create a sort of animation or display of the parsing process, which
     * I think would be a pretty cool feature. 
     */

    applyGrammar(template)
    {
        // Trim whitespace from both ends of the string.
        let output = template.trim()
        // Reduce excess whitepace down to one space
        output.replace(/\s{2,}/g, ' ')
        // Ensure the first letter in the sentance is capitalized
        output = output[0].toUpperCase() + output.substr(1)
        // ensure that the sentence ends in some sort of punctuation.
        switch(output[output.length - 1])
        {
            case '.':
            case '!':
            case '?':
                break // do nothing, this is good punctuation
            case ',': 
                // replace comma with period
                output = output.substr(0, output.length - 1) + "."
                break;
            default:
                // in any other case, add a period at the end to get punctuation
                output += "."
                break;
        }

        return output
    }

    /**
     * Parses a string which contains the data necessary to generate sentences and converts them into
     * a matrix of categories and their values.
     * @param {String} data A string which contains categories defined with SentenceGen syntax.
     * @returns An array of key value pairs where the keys are the name of a category, and the values are the strings in that category.
     */
    parseCategories(data)
    {
        const lines = data.split(/\n/)
        // if we already have pre-existing categories, add to them instead of replace them.
        const categories = this.categories != undefined ? this.categories : []
        let currentCategory = ""
        lines.forEach(line => {
            line = line.trim()
            if (!line || line.startsWith('-'))
            {
                // line is empty or comment, move on.
                return
            }

            // check for the beginning of a category
            if (line.startsWith('#'))
            {
                // capture the category name
                const category = line.substr(1, line.length - 2)
                currentCategory = category.toLowerCase()
                // don't overwrite the category array if values already existed, else define an empty new category.
                categories[currentCategory] = categories[currentCategory] != undefined ? categories[currentCategory] : []
            }
            // ignore all strings which are not preceeded by a category name.
            else if (currentCategory)
            {
                // Treat the string as an opaque string and save it to the category
                categories[currentCategory].push(line)
            }

        });
        return categories
    }

    /**
     * Checks against all possible sentence generation operations 
     * @param {String} template A string to check if further parsing is needed to generate the sentence.
     */
    parsingRequired(template)
    {
        // by using Object.values on our list of regexes, we can dynamically
        // add more things we want to check and not have to update this function
        const regexes = Object.values(this.regex)
        for (let i = 0; i < regexes.length; i++)
        {
            if (regexes[i].test(template))
            {
                return true
            }
        }
        return false
    }

    /**
     * Picks a string from one of the categories.
     * @param {String} category The category to pick from.
     * @returns {String} a string from the desired category, or the category name if there is no definition for that category.
     */
    pickFrom(category)
    {
        // TODO: prevent repeats, track state of which value was chosen last from each category (simple map of key, last used index)
        category = category.toLowerCase();
        if (this.categories[category] == undefined || this.categories[category].length === 0)
        {
            // undeclared or empty category
            return category
        }

        // We have a category that has options to pick from. Let's start choosing.
        const index = Math.floor(Math.random() * this.categories[category].length)
        return this.categories[category][index]
    }

    /**
     * Replaces all categories with an option from that category until no category markers remain.
     * If two categories reference each other in all of their template strings, infinite recursion may occur.
     * @param {String} template a string which contains a template to parse
     * @returns A copy of the parameter string, with all categories reduced to their base components.
     */
    reduceCategories(template)
    {
        /*
         * TODO: somehow make it so that some categories can be dependent on other categories.
         * So that male names are picked when gender resolves to male, and so on. 
         * Perhaps delimiting conditional categories with @dependency/<value>@ would work?
         * Issues:
         * - multiple dependencies: Elf male names vs female halfling names, both race and gender are dependencies
         * - multiple instances of a dependency. If I use dwarf twice in a sentence, and race is a dependency, this is hard.
         * - the dependent category could come in later during sentence generation, possibly after resolving a non-dependent category.
         * This will likely require a separate function, called reduceDependentCategories or something.
         */
        let output = template.slice()
        while (this.regex.categoryRef.test(output))
        {
            const firstMatch = output.match(this.regex.categoryRef)
            // get the name of the category found
            const category = firstMatch[0].substr(1, firstMatch[0].length - 2)
            // get a string from that category
            const newString = this.pickFrom(category)
            // inject the new string into the template
            output = output.replace(this.regex.categoryRef, newString)
        }
        
        return output
    }

    /**
     * Replaces all <a> or <an> with the appropriate word based on the word following it.
     * @param {String} template a string which contains a template to parse
     * @returns A copy of the parameter string, with all "a"s and "an"s appropriately determined.
     */
    resolveAnChecks(template)
    {
        let output = template.slice()
        while (this.regex.aOrAn.test(output))
        {
            const firstMatch = output.match(this.regex.aOrAn)
            // search for the first letter after the <a>
            const nextChar = output.substr(firstMatch["index"] + 3).match(/\w/)
            let switchToAn = false
            // it is possible the <a> is at the end of the string, so we do a null safety check
            if (nextChar != null)
            {
                if ("aeiou".includes(nextChar[0].toLowerCase()))
                {
                    // if the next character is a vowel, resolve to "an"
                    switchToAn = true
                }
                if (nextChar["index"] == firstMatch["index"] + 4)
                {
                    // there was no whitespace, insert some
                    output = output.slice(0, nextChar["index"]) + ' ' + output.slice(nextChar["index"])
                }
            }
            output = output.replace(this.regex.aOrAn, switchToAn? "an" : "a")
        }
        return output
    }

    /**
     * Replaces all [pick, from] strings in a template.
     * @param {string} template a string which contains a template to parse
     * @returns A copy of the parameter string, with all pick one choices made.
     */
    resolveAllPickers(template)
    {
        let output = template.slice()
        while(this.regex.pickOne.test(output))
        {
            const firstMatch = output.match(this.regex.pickOne)
            const pickArr = firstMatch[0]
                .substr(1, firstMatch[0].length - 2) // trim the [ ]
                .split(/,\s*/) // split into an array of strings
            const choice = pickArr[Math.floor(Math.random() * pickArr.length)]
            output = output.replace(this.regex.pickOne, choice.toLowerCase())
        }
        return output
    }
}