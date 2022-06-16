// find subarray sum for l and r and for each 0 add x to the sum - each query: l, r, x

#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);



/*
 * Complete the 'findSum' function below.
 *
 * The function is expected to return a LONG_INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY numbers
 *  2. 2D_INTEGER_ARRAY queries
 */

vector<long> findSum(vector<int> numbers, vector<vector<int>> queries) {
    int n = numbers.size();
    vector<pair<long long, long long>> util(n);
    
    util[0] = {numbers[0], (numbers[0] == 0)};
    for(int i=1; i<n; i++){
        util[i].first = util[i-1].first + numbers[i];
        util[i].second = util[i-1].second + (numbers[i] == 0);
    }
    
    vector<long> ans;
    
    for(auto it: queries) {
        int l = it[0]-1, r = it[1]-1, x = it[2];
        long sum = util[r].first - (l ? util[l-1].first : 0) + x * (util[r].second - (l ? util[l-1].second : 0));
        
        ans.push_back(sum);
    }
    return ans;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string numbers_count_temp;
    getline(cin, numbers_count_temp);

    int numbers_count = stoi(ltrim(rtrim(numbers_count_temp)));

    vector<int> numbers(numbers_count);

    for (int i = 0; i < numbers_count; i++) {
        string numbers_item_temp;
        getline(cin, numbers_item_temp);

        int numbers_item = stoi(ltrim(rtrim(numbers_item_temp)));

        numbers[i] = numbers_item;
    }

    string queries_rows_temp;
    getline(cin, queries_rows_temp);

    int queries_rows = stoi(ltrim(rtrim(queries_rows_temp)));

    string queries_columns_temp;
    getline(cin, queries_columns_temp);

    int queries_columns = stoi(ltrim(rtrim(queries_columns_temp)));

    vector<vector<int>> queries(queries_rows);

    for (int i = 0; i < queries_rows; i++) {
        queries[i].resize(queries_columns);

        string queries_row_temp_temp;
        getline(cin, queries_row_temp_temp);

        vector<string> queries_row_temp = split(rtrim(queries_row_temp_temp));

        for (int j = 0; j < queries_columns; j++) {
            int queries_row_item = stoi(queries_row_temp[j]);

            queries[i][j] = queries_row_item;
        }
    }

    vector<long> result = findSum(numbers, queries);

    for (int i = 0; i < result.size(); i++) {
        fout << result[i];

        if (i != result.size() - 1) {
            fout << "\n";
        }
    }

    fout << "\n";

    fout.close();

    return 0;
}

string ltrim(const string &str) {
    string s(str);

    s.erase(
        s.begin(),
        find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))
    );

    return s;
}

string rtrim(const string &str) {
    string s(str);

    s.erase(
        find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),
        s.end()
    );

    return s;
}

vector<string> split(const string &str) {
    vector<string> tokens;

    string::size_type start = 0;
    string::size_type end = 0;

    while ((end = str.find(" ", start)) != string::npos) {
        tokens.push_back(str.substr(start, end - start));

        start = end + 1;
    }

    tokens.push_back(str.substr(start));

    return tokens;
}
